/**
 * localStore.js
 * Base44 API yerine localStorage kullanan basit veri katmanı.
 * Tüm veriler tarayıcıda saklanır, internet gerekmez.
 */

import { MOCK_EXERCISES } from "@/data/mockExercises";

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
const PROGRESS_KEY = "koah_progress";

export const progressStore = {
    /** Tüm kayıtları tarihe göre yeniden eskiye sırala */
    list() {
        try {
            const data = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "[]");
            return Array.isArray(data) ? data : [];
        } catch {
            return [];
        }
    },

    /** Yeni tamamlanmış egzersiz ekle */
    add(exercise) {
        const entry = {
            id: `local-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            exercise_id: exercise.id,
            exercise_title: exercise.title,
            completed_date: new Date().toISOString().split("T")[0],
            duration_minutes: exercise.duration_minutes || 5,
        };
        const existing = progressStore.list();
        existing.unshift(entry);
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(existing));
        return entry;
    },

    /** Bugün tamamlanan sayısı */
    todayCount() {
        const today = new Date().toISOString().split("T")[0];
        return progressStore.list().filter((p) => p.completed_date === today).length;
    },

    /** Toplam tamamlanan sayısı */
    totalCount() {
        return progressStore.list().length;
    },

    /** Kaç farklı günde egzersiz yapıldı */
    activeDays() {
        return new Set(progressStore.list().map((p) => p.completed_date)).size;
    },
};

/* ─── User (localStorage'da basit profil) ─────────────────────── */
const USER_KEY = "koah_user";

export const userStore = {
    get() {
        try {
            return JSON.parse(localStorage.getItem(USER_KEY) || "null");
        } catch {
            return null;
        }
    },
    set(data) {
        localStorage.setItem(USER_KEY, JSON.stringify(data));
    },
};
