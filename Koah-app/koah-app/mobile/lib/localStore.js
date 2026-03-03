/**
 * localStore.js
 * React Native / AsyncStorage tabanlı veri katmanı.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MOCK_EXERCISES } from "../data/mockExercises";

/* ─── Exercises ─────────────────────────────────────────────── */
export const exerciseStore = {
    list() {
        return MOCK_EXERCISES;
    },
    get(id) {
        return MOCK_EXERCISES.find((e) => e.id === id) || null;
    },
};

/* ─── UserProgress ───────────────────────────────────────────── */
const PROGRESS_KEY = "koah_progress_mobile";

export const progressStore = {
    /** Tüm kayıtları tarihe göre yeniden eskiye sırala */
    async list() {
        try {
            const data = await AsyncStorage.getItem(PROGRESS_KEY);
            return data ? JSON.parse(data) : [];
        } catch {
            return [];
        }
    },

    /** Yeni tamamlanmış egzersiz ekle */
    async add(exercise) {
        const entry = {
            id: `local-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            exercise_id: exercise.id,
            exercise_title: exercise.title,
            completed_date: new Date().toISOString().split("T")[0],
            duration_minutes: exercise.duration_minutes || 5,
        };
        const existing = await progressStore.list();
        existing.unshift(entry);
        await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(existing));
        return entry;
    },

    /** Bugün tamamlanan sayısı */
    async todayCount() {
        const today = new Date().toISOString().split("T")[0];
        const list = await progressStore.list();
        return list.filter((p) => p.completed_date === today).length;
    },

    /** Toplam tamamlanan sayısı */
    async totalCount() {
        const list = await progressStore.list();
        return list.length;
    },

    /** Kaç farklı günde egzersiz yapıldı */
    async activeDays() {
        const list = await progressStore.list();
        return new Set(list.map((p) => p.completed_date)).size;
    },

    /** Verileri sıfırla */
    async clear() {
        await AsyncStorage.removeItem(PROGRESS_KEY);
    }
};
