import { supabase } from '../lib/supabase';
import type { TherapyMatch, QuestionnaireResponse } from '../lib/supabase';

export class MatchingService {
  // Genera match per un paziente
  static async generateMatches(patientId: string, questionnaireResponseId: string) {
    try {
      // 1. Recupera la risposta del questionario
      const { data: questionnaire, error: qError } = await supabase
        .from('questionnaire_responses')
        .select('*')
        .eq('id', questionnaireResponseId)
        .single();

      if (qError) throw qError;

      // 2. Trova psicologi compatibili
      const compatiblePsychologists = await this.findCompatiblePsychologists(questionnaire);

      // 3. Calcola score di compatibilità e crea i match
      const matches = [];
      for (let i = 0; i < Math.min(3, compatiblePsychologists.length); i++) {
        const psychologist = compatiblePsychologists[i];
        const compatibilityScore = this.calculateCompatibilityScore(questionnaire, psychologist);
        const reasonsForMatch = this.generateMatchReasons(questionnaire, psychologist);

        const matchData = {
          patient_id: patientId,
          psychologist_id: psychologist.id,
          questionnaire_response_id: questionnaireResponseId,
          compatibility_score: compatibilityScore,
          reasons_for_match: reasonsForMatch,
          match_rank: i + 1,
          status: 'active' as const
        };

        matches.push(matchData);
      }

      // 4. Salva i match nel database
      const { data: savedMatches, error: matchError } = await supabase
        .from('therapy_matches')
        .insert(matches)
        .select();

      if (matchError) throw matchError;

      return savedMatches;
    } catch (error) {
      console.error('Errore nella generazione dei match:', error);
      throw error;
    }
  }

  // Trova psicologi compatibili
  private static async findCompatiblePsychologists(questionnaire: QuestionnaireResponse) {
    try {
      // Query base per psicologi verificati
      let query = supabase
        .from('users')
        .select(`
          *,
          user_profiles!inner (*)
        `)
        .eq('role', 'psychologist')
        .eq('user_profiles.is_verified_professional', true);

      // Filtri basati sul tipo di terapia
      const therapyTypeSpecializations = this.getSpecializationsByTherapyType(questionnaire.therapy_type);
      
      if (therapyTypeSpecializations.length > 0) {
        query = query.overlaps('user_profiles.specializations', therapyTypeSpecializations);
      }

      // Filtri geografici se richiesta presenza
      const responses = questionnaire.responses;
      if (responses.location_city && this.requiresInPersonTherapy(responses)) {
        query = query.eq('user_profiles.location_city', responses.location_city);
      }

      const { data: psychologists, error } = await query;
      if (error) throw error;

      return psychologists || [];
    } catch (error) {
      console.error('Errore nella ricerca psicologi:', error);
      return [];
    }
  }

  // Ottieni specializzazioni per tipo di terapia
  private static getSpecializationsByTherapyType(therapyType: string): string[] {
    switch (therapyType) {
      case 'individual':
        return ['Terapia Cognitivo Comportamentale', 'Disturbi d\'Ansia', 'Depressione', 'Terapia Psicodinamica'];
      case 'couple':
        return ['Terapia di Coppia', 'Terapia Familiare', 'Mediazione Familiare', 'Consulenza di Coppia'];
      case 'child':
        return ['Psicologia Infantile', 'Neuropsicologia', 'ADHD', 'Disturbi dello Spettro Autistico', 'Terapia Familiare'];
      default:
        return [];
    }
  }

  // Controlla se richiede terapia in presenza
  private static requiresInPersonTherapy(responses: Record<string, any>): boolean {
    const modalityKeys = ['session_modality', 'session_modality_couple', 'session_modality_child'];
    
    for (const key of modalityKeys) {
      if (responses[key]) {
        return ['Solo in presenza', 'Entrambe le modalità', 'Non ho preferenze', 'Misto (presenza per bambino, online per genitori)']
          .includes(responses[key]);
      }
    }
    
    return false;
  }

  // Calcola score di compatibilità
  private static calculateCompatibilityScore(questionnaire: QuestionnaireResponse, psychologist: any): number {
    let score = 70; // Score base
    const responses = questionnaire.responses;
    const profile = psychologist.user_profiles[0];

    // Fattori di compatibilità
    
    // 1. Esperienza (peso: 15%)
    if (profile.years_of_experience >= 5) score += 10;
    if (profile.years_of_experience >= 10) score += 5;

    // 2. Rating (peso: 10%)
    if (profile.rating >= 4.5) score += 8;
    else if (profile.rating >= 4.0) score += 5;

    // 3. Specializzazioni (peso: 20%)
    const requiredSpecializations = this.getSpecializationsByTherapyType(questionnaire.therapy_type);
    const matchingSpecs = profile.specializations?.filter((spec: string) => 
      requiredSpecializations.some(req => req.toLowerCase().includes(spec.toLowerCase()))
    ) || [];
    score += Math.min(15, matchingSpecs.length * 5);

    // 4. Preferenze di genere (peso: 5%)
    const genderPreference = responses.therapist_gender || responses.therapist_gender_preference_couple || responses.therapist_preferences_child;
    if (genderPreference && genderPreference !== 'Nessuna preferenza') {
      // Logica per matching di genere (da implementare con dati reali)
      score += 5;
    }

    // 5. Approccio terapeutico (peso: 15%)
    if (responses.therapy_approach) {
      // Logica per matching approccio terapeutico
      score += 10;
    }

    // 6. Disponibilità geografica (peso: 10%)
    if (responses.location_city && profile.location_city === responses.location_city) {
      score += 8;
    }

    // Normalizza il score tra 70 e 100
    return Math.min(100, Math.max(70, score));
  }

  // Genera motivi del match
  private static generateMatchReasons(questionnaire: QuestionnaireResponse, psychologist: any): string[] {
    const reasons = [];
    const profile = psychologist.user_profiles[0];
    const responses = questionnaire.responses;

    // Specializzazioni
    const therapyTypeSpecializations = this.getSpecializationsByTherapyType(questionnaire.therapy_type);
    const matchingSpecs = profile.specializations?.filter((spec: string) => 
      therapyTypeSpecializations.some(req => req.toLowerCase().includes(spec.toLowerCase()))
    ) || [];
    
    if (matchingSpecs.length > 0) {
      reasons.push(`Specializzato nelle tue aree di interesse: ${matchingSpecs.join(', ')}`);
    }

    // Esperienza
    if (profile.years_of_experience >= 10) {
      reasons.push(`Oltre ${profile.years_of_experience} anni di esperienza clinica`);
    } else if (profile.years_of_experience >= 5) {
      reasons.push(`${profile.years_of_experience} anni di esperienza nel settore`);
    }

    // Rating
    if (profile.rating >= 4.5) {
      reasons.push(`Valutazione eccellente: ${profile.rating}/5 (${profile.review_count} recensioni)`);
    }

    // Approccio terapeutico
    if (responses.therapy_approach) {
      reasons.push('Approccio terapeutico compatibile con le tue preferenze');
    }

    // Disponibilità geografica
    if (responses.location_city && profile.location_city === responses.location_city) {
      reasons.push('Disponibile nella tua zona per sessioni in presenza');
    }

    // Lingue
    if (profile.languages?.includes('Italiano')) {
      reasons.push('Parla fluentemente italiano');
    }

    return reasons.slice(0, 4); // Massimo 4 motivi
  }

  // Recupera match di un paziente
  static async getPatientMatches(patientId: string) {
    try {
      const { data, error } = await supabase
        .from('therapy_matches')
        .select(`
          *,
          psychologist:users!therapy_matches_psychologist_id_fkey (
            *,
            user_profiles (*)
          )
        `)
        .eq('patient_id', patientId)
        .eq('status', 'active')
        .order('match_rank');

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Errore nel recupero match:', error);
      throw error;
    }
  }

  // Aggiorna stato match
  static async updateMatchStatus(matchId: string, status: TherapyMatch['status']) {
    try {
      const { data, error } = await supabase
        .from('therapy_matches')
        .update({ status })
        .eq('id', matchId)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Errore nell\'aggiornamento match:', error);
      throw error;
    }
  }
}