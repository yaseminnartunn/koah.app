import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { ArrowLeft, LogOut, Award, Calendar, Activity } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { progressStore } from '../lib/localStore';

export default function Profile() {
    const router = useRouter();
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadData = async () => {
        const list = await progressStore.list();
        setProgress(list);
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const todayStr = new Date().toISOString().split("T")[0];
    const todayCount = progress.filter((p) => p.completed_date === todayStr).length;
    const uniqueDays = new Set(progress.map((p) => p.completed_date)).size;
    const recent = progress.slice(0, 5);

    const handleClearData = () => {
        Alert.alert(
            "Verileri Sıfırla",
            "Tüm egzersiz geçmişiniz silinecek. Emin misiniz?",
            [
                { text: "Vazgeç", style: "cancel" },
                {
                    text: "Evet, Sil",
                    style: "destructive",
                    onPress: async () => {
                        await progressStore.clear();
                        setProgress([]);
                    }
                }
            ]
        )
    }

    return (
        <SafeAreaView className="flex-1 bg-[#fff0f6]">
            <View className="bg-[#e91e8c] pt-12 pb-10 px-5 rounded-b-[40px] shadow-lg items-center">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="absolute left-5 top-12 p-2 bg-white/20 rounded-full"
                >
                    <ArrowLeft size={20} color="white" />
                </TouchableOpacity>

                <View className="w-24 h-24 rounded-full bg-white/20 items-center justify-center mb-4 border-2 border-white/30">
                    <Text className="text-4xl">🧑‍⚕️</Text>
                </View>
                <Text className="text-white text-2xl font-bold">Kullanıcı</Text>
                <Text className="text-pink-100 text-sm opacity-80 mt-1">Koah Takip Uygulaması</Text>
            </View>

            <ScrollView className="flex-1 px-5 pt-6">
                <View className="space-y-6 pb-20">
                    {/* Stats Grid */}
                    <View className="flex-row space-x-3 h-24">
                        <View className="flex-1 bg-white rounded-3xl p-4 items-center justify-center shadow-sm border border-gray-50">
                            <Activity size={20} color="#e91e8c" className="mb-1" />
                            <Text className="text-xl font-bold text-gray-800">{todayCount}</Text>
                            <Text className="text-[10px] text-gray-400 font-bold uppercase">Bugün</Text>
                        </View>
                        <View className="flex-1 bg-white rounded-3xl p-4 items-center justify-center shadow-sm border border-gray-50">
                            <Award size={20} color="#e91e8c" className="mb-1" />
                            <Text className="text-xl font-bold text-gray-800">{progress.length}</Text>
                            <Text className="text-[10px] text-gray-400 font-bold uppercase">Toplam</Text>
                        </View>
                        <View className="flex-1 bg-white rounded-3xl p-4 items-center justify-center shadow-sm border border-gray-50">
                            <Calendar size={20} color="#e91e8c" className="mb-1" />
                            <Text className="text-xl font-bold text-gray-800">{uniqueDays}</Text>
                            <Text className="text-[10px] text-gray-400 font-bold uppercase">Aktif Gün</Text>
                        </View>
                    </View>

                    {/* Recent Activity */}
                    <View className="bg-white rounded-3xl p-5 shadow-sm border border-gray-50">
                        <Text className="text-sm font-bold text-gray-800 mb-4">Son Egzersizler</Text>

                        {loading ? (
                            <Text className="text-center py-4 text-gray-400 animate-pulse">Yükleniyor...</Text>
                        ) : recent.length === 0 ? (
                            <View className="items-center py-6">
                                <Text className="text-sm text-gray-400 font-medium">Henüz egzersiz tamamlanmadı 🌱</Text>
                            </View>
                        ) : (
                            <View className="space-y-4">
                                {recent.map((p, i) => (
                                    <View key={p.id} className={`flex-row items-center justify-between pb-3 ${i < recent.length - 1 ? 'border-b border-gray-50' : ''}`}>
                                        <View className="flex-row items-center space-x-3">
                                            <View className="w-10 h-10 rounded-2xl bg-green-50 items-center justify-center">
                                                <Text className="text-sm">✅</Text>
                                            </View>
                                            <View>
                                                <Text className="text-sm font-bold text-gray-800" numberOfLines={1}>{p.exercise_title}</Text>
                                                <Text className="text-[10px] text-gray-400 font-medium">{p.completed_date}</Text>
                                            </View>
                                        </View>
                                        <Text className="text-xs text-[#e91e8c] font-bold">{p.duration_minutes} dk</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>

                    {/* Settings/Logout Button */}
                    <TouchableOpacity
                        onPress={handleClearData}
                        className="bg-white border border-red-100 rounded-3xl py-4 flex-row items-center justify-center space-x-2 shadow-sm"
                    >
                        <LogOut size={18} color="#f87171" />
                        <Text className="text-red-400 font-bold text-sm">Egzersiz Verilerini Sıfırla</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
