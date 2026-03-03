import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { exerciseStore } from '../../lib/localStore';
import ExerciseCard from '../../components/ExerciseCard';
import CategoryFilter from '../../components/CategoryFilter';

export default function Exercises() {
    const router = useRouter();
    const [exercises, setExercises] = useState([]);
    const [category, setCategory] = useState('all');

    useEffect(() => {
        setExercises(exerciseStore.list());
    }, []);

    const filtered = category === 'all'
        ? exercises
        : exercises.filter((e) => e.category === category);

    return (
        <SafeAreaView className="flex-1 bg-[#fff0f6]">
            <View className="bg-[#e91e8c] pt-12 pb-6 px-5 rounded-b-[40px] shadow-lg">
                <View className="flex-row items-center space-x-4 mb-4">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="p-2 bg-white/20 rounded-full"
                    >
                        <ArrowLeft size={20} color="white" />
                    </TouchableOpacity>
                    <Text className="text-white text-xl font-bold">KOAH Egzersizleri</Text>
                </View>
                <CategoryFilter selected={category} onChange={setCategory} />
            </View>

            <ScrollView className="flex-1 px-5 pt-6">
                {filtered.length === 0 ? (
                    <View className="items-center py-20">
                        <Text className="text-4xl mb-3">🫁</Text>
                        <Text className="text-sm text-gray-500 font-medium">Bu kategoride egzersiz yok</Text>
                    </View>
                ) : (
                    <View className="pb-10">
                        {filtered.map((ex) => (
                            <ExerciseCard key={ex.id} exercise={ex} />
                        ))}
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
