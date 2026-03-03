import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, SafeAreaView, Alert } from 'react-native';
import { ArrowLeft, Clock, CheckCircle, AlertCircle } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { exerciseStore, progressStore } from '../../lib/localStore';

const categoryLabels = {
    nefes: "Nefes Egzersizi",
    isinma: "Isınma Hareketi",
    guclendir: "Güçlendirme",
    germe: "Germe",
};

export default function ExerciseDetail() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [exercise, setExercise] = useState(null);
    const [showWarning, setShowWarning] = useState(true);
    const [completed, setCompleted] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (id) {
            setExercise(exerciseStore.get(id));
        }
    }, [id]);

    const handleComplete = async () => {
        if (!exercise) return;
        setSaving(true);
        try {
            await new Promise(r => setTimeout(r, 800)); // Simulating save
            await progressStore.add(exercise);
            setCompleted(true);
        } catch (e) {
            Alert.alert("Hata", "Egzersiz kaydedilemedi.");
        } finally {
            setSaving(false);
        }
    };

    if (!exercise) return null;

    return (
        <SafeAreaView className="flex-1 bg-[#fff0f6]">
            {/* Header section with gradient background simulation */}
            <View className="bg-[#e91e8c] pt-12 pb-8 px-5 rounded-b-[40px] shadow-lg relative">
                <View className="flex-row items-center space-x-3 mb-3">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="p-2 bg-white/20 rounded-full"
                    >
                        <ArrowLeft size={20} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white/90 text-sm font-medium">
                        {categoryLabels[exercise.category]}
                    </Text>
                </View>
                <Text className="text-white text-2xl font-bold leading-8">{exercise.title}</Text>
                {exercise.is_standing && (
                    <View className="mt-4 flex-row">
                        <View className="bg-white/25 px-4 py-1.5 rounded-full">
                            <Text className="text-white text-xs font-bold">Ayakta Yapılır</Text>
                        </View>
                    </View>
                )}
            </View>

            <ScrollView className="flex-1 px-5 pt-6">
                <View className="space-y-5 pb-20">

                    {/* Warning Card */}
                    {showWarning && (
                        <View className="bg-amber-50 border border-amber-100 rounded-3xl p-5 flex-row space-x-3">
                            <AlertCircle size={20} color="#f59e0b" className="mt-1" />
                            <View className="flex-1">
                                <Text className="text-amber-800 text-sm font-bold mb-1">Dikkat!</Text>
                                <Text className="text-amber-700 text-xs leading-5">
                                    Bu hareketi yaparken baş dönerse egzersizi sonlandırın. Bağımsız değil, her zaman sıranızda yapın.
                                </Text>
                            </View>
                            <TouchableOpacity onPress={() => setShowWarning(false)}>
                                <Text className="text-amber-500 font-bold p-1">✕</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Image */}
                    <View className="w-full h-56 rounded-3xl overflow-hidden bg-gray-100 shadow-sm">
                        <Image
                            source={exercise.image_url}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>

                    {/* Stats Row */}
                    <View className="flex-row space-x-4">
                        <View className="flex-1 bg-white rounded-3xl p-4 flex-row items-center space-x-3 border border-gray-50 shadow-sm">
                            <View className="w-10 h-10 rounded-2xl bg-pink-50 items-center justify-center">
                                <Clock size={20} color="#e91e8c" />
                            </View>
                            <View>
                                <Text className="text-[10px] font-bold text-gray-400 uppercase">Süre</Text>
                                <Text className="text-sm font-bold text-gray-800">{exercise.duration_minutes || 5} dk</Text>
                            </View>
                        </View>
                        <View className="flex-1 bg-white rounded-3xl p-4 flex-row items-center space-x-3 border border-gray-50 shadow-sm">
                            <View className="w-10 h-10 rounded-2xl bg-pink-50 items-center justify-center">
                                <Text className="text-lg">💪</Text>
                            </View>
                            <View>
                                <Text className="text-[10px] font-bold text-gray-400 uppercase">Zorluk</Text>
                                <Text className="text-sm font-bold text-gray-800 capitalize">{exercise.difficulty || "kolay"}</Text>
                            </View>
                        </View>
                    </View>

                    {/* About Section */}
                    <View className="bg-white rounded-3xl p-5 border border-gray-50 shadow-sm">
                        <Text className="text-sm font-bold text-gray-800 mb-2">Hakkında</Text>
                        <Text className="text-sm text-gray-600 leading-6">{exercise.description}</Text>
                    </View>

                    {/* Instructions Section */}
                    <View className="bg-white rounded-3xl p-5 border border-gray-50 shadow-sm">
                        <Text className="text-sm font-bold text-gray-800 mb-2">Nasıl Yapılır?</Text>
                        <Text className="text-sm text-gray-600 leading-6">{exercise.instructions}</Text>
                    </View>

                    {/* Footer Action */}
                    <View className="pt-4">
                        {completed ? (
                            <View className="bg-green-50 border border-green-100 rounded-2xl p-5 flex-row items-center justify-center space-x-2">
                                <CheckCircle size={20} color="#10b981" />
                                <Text className="text-green-700 font-bold text-sm">Egzersiz tamamlandı! 🎉</Text>
                            </View>
                        ) : (
                            <TouchableOpacity
                                onPress={handleComplete}
                                disabled={saving}
                                className={`w-full py-5 rounded-3xl shadow-lg flex-row items-center justify-center space-x-2 ${saving ? 'bg-pink-300' : 'bg-[#e91e8c]'
                                    }`}
                            >
                                <Text className="text-white font-bold text-lg">
                                    {saving ? "Kaydediliyor..." : "Son Egzersiz ✓"}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
