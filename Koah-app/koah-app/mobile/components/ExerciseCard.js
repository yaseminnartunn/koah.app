import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Clock, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const categoryLabels = {
    nefes: "Nefes",
    isinma: "Isınma",
    guclendir: "Güçlendir",
    germe: "Germe",
};

const difficultyColors = {
    kolay: "bg-green-100 text-green-700",
    orta: "bg-yellow-100 text-yellow-700",
    zor: "bg-red-100 text-red-700",
};

export default function ExerciseCard({ exercise }) {
    const router = useRouter();

    return (
        <TouchableOpacity
            onPress={() => router.push(`/exercises/${exercise.id}`)}
            className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-4"
        >
            <View className="relative w-full h-44 bg-gray-100">
                <Image
                    source={exercise.image_url}
                    className="w-full h-full"
                    resizeMode="cover"
                />

                {/* Badges on image */}
                <View className="absolute bottom-2 left-2 right-2 flex-row justify-between items-end">
                    <View className="bg-[#e91e8c] px-3 py-1 rounded-lg shadow-sm">
                        <Text className="text-white text-[10px] font-bold">
                            {categoryLabels[exercise.category] || exercise.category}
                        </Text>
                    </View>
                    {exercise.is_standing && (
                        <View className="bg-white/90 px-3 py-1 rounded-lg shadow-sm border border-gray-100">
                            <Text className="text-gray-600 text-[10px] font-bold">Ayakta</Text>
                        </View>
                    )}
                </View>
            </View>

            <View className="p-4">
                <Text className="font-bold text-gray-800 text-base mb-1">
                    {exercise.title}
                </Text>
                <Text className="text-xs text-gray-500 mb-3 leading-4" numberOfLines={2}>
                    {exercise.description}
                </Text>

                <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center space-x-1.5 opacity-60">
                        <Clock size={14} color="#6b7280" />
                        <Text className="text-xs text-gray-500 font-medium">
                            {exercise.duration_minutes || 5} dk
                        </Text>
                    </View>

                    <View className="flex-row items-center space-x-1.5">
                        <View className={`${difficultyColors[exercise.difficulty]?.split(' ')[0]} px-3 py-1 rounded-full`}>
                            <Text className={`${difficultyColors[exercise.difficulty]?.split(' ')[1]} text-[10px] font-bold capitalize`}>
                                {exercise.difficulty}
                            </Text>
                        </View>
                        <ChevronRight size={18} color="#d1d5db" />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
