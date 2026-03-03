import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, RefreshControl } from 'react-native';
import { Bell, User, Search, Play } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { exerciseStore, progressStore } from '../lib/localStore';
import StatsCard from '../components/StatsCard';
import ExerciseCard from '../components/ExerciseCard';
import CategoryFilter from '../components/CategoryFilter';

export default function Home() {
    const router = useRouter();
    const [exercises, setExercises] = useState([]);
    const [stats, setStats] = useState({ today: 0, total: 0 });
    const [category, setCategory] = useState('all');
    const [search, setSearch] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const loadData = async () => {
        setExercises(exerciseStore.list());
        const [today, total] = await Promise.all([
            progressStore.todayCount(),
            progressStore.totalCount(),
        ]);
        setStats({ today, total });
    };

    useEffect(() => {
        loadData();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await loadData();
        setRefreshing(false);
    };

    const filtered = exercises.filter((ex) => {
        const matchCat = category === 'all' || ex.category === category;
        const matchSearch = !search || ex.title.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    return (
        <ScrollView
            className="flex-1 bg-[#fff0f6]"
            stickyHeaderIndices={[0]}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            {/* Pink Header Section (Non-sticky part of content if preferred, but here it starts) */}
            <View className="bg-[#e91e8c] pt-14 pb-8 px-5 rounded-b-[40px] shadow-lg">
                <View className="flex-row justify-between items-center mb-6">
                    <View>
                        <Text className="text-pink-100 text-sm font-semibold">Hoş geldin 👋</Text>
                        <Text className="text-white text-2xl font-bold">Kullanıcı</Text>
                    </View>
                    <View className="flex-row space-x-3">
                        <TouchableOpacity className="p-2.5 bg-white/20 rounded-full">
                            <Bell size={20} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => router.push('/profile')}
                            className="p-2.5 bg-white/20 rounded-full"
                        >
                            <User size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Search Bar */}
                <View className="flex-row items-center bg-white rounded-2xl px-4 py-3 shadow-sm">
                    <Search size={18} color="#9ca3af" />
                    <TextInput
                        placeholder="Egzersiz ara..."
                        value={search}
                        onChangeText={setSearch}
                        className="flex-1 ml-3 text-sm text-gray-700 font-medium"
                        placeholderTextColor="#9ca3af"
                    />
                </View>
            </View>

            <View className="px-5 py-6 space-y-6">
                {/* Stats Grid */}
                <View className="flex-row space-x-3 h-24 mb-6">
                    <StatsCard label="Bugün Tamamlanan" value={stats.today} color="bg-[#f06292]" />
                    <StatsCard label="Toplam Egzersiz" value={stats.total} color="bg-[#ad1457]" />
                    <StatsCard label="Mevcut Liste" value={exercises.length} color="bg-[#e91e8c]" />
                </View>

                {/* Highlight Card */}
                <View className="bg-white rounded-3xl p-5 border border-pink-100 shadow-sm mb-6">
                    <Text className="text-[10px] text-pink-500 font-bold tracking-[2px] mb-1">✦ GÜNÜN EGZERSİZİ</Text>
                    <Text className="text-lg font-bold text-gray-800">Bugünkü egzersize hazır mısın?</Text>
                    <Text className="text-xs text-gray-500 mt-1 leading-4">
                        Solunum rehabilitasyonu için nefes egzersizleri seni bekliyor.
                    </Text>
                    <TouchableOpacity
                        onPress={() => router.push('/exercises')}
                        className="mt-4 bg-[#e91e8c] flex-row items-center justify-center px-6 py-3 rounded-2xl self-start shadow-md"
                    >
                        <Text className="text-white font-bold text-sm mr-2">Başla</Text>
                        <Play size={14} color="white" fill="white" />
                    </TouchableOpacity>
                </View>

                {/* Categories */}
                <View className="mb-4">
                    <Text className="text-sm font-bold text-gray-700 mb-3 px-1">Egzersizler</Text>
                    <CategoryFilter selected={category} onChange={setCategory} />
                </View>

                {/* Exercise List */}
                <View className="pb-10">
                    {filtered.length === 0 ? (
                        <View className="items-center py-10">
                            <Text className="text-sm text-gray-400 font-medium">Egzersiz bulunamadı 😔</Text>
                        </View>
                    ) : (
                        filtered.map((ex) => (
                            <ExerciseCard key={ex.id} exercise={ex} />
                        ))
                    )}
                </View>
            </View>
        </ScrollView>
    );
}
