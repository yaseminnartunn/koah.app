import React from 'react';
import { ScrollView, TouchableOpacity, Text, View } from 'react-native';

const CATEGORIES = [
    { id: 'all', label: 'Tümü' },
    { id: 'nefes', label: 'Nefes' },
    { id: 'isinma', label: 'Isınma' },
    { id: 'guclendir', label: 'Güçlendir' },
    { id: 'germe', label: 'Germe' },
];

export default function CategoryFilter({ selected, onChange }) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row space-x-2 py-2"
            contentContainerStyle={{ paddingHorizontal: 4 }}
        >
            {CATEGORIES.map((cat) => {
                const isActive = selected === cat.id;
                return (
                    <TouchableOpacity
                        key={cat.id}
                        onPress={() => onChange(cat.id)}
                        className={`px-5 py-2.5 rounded-2xl mr-2 shadow-sm ${isActive ? 'bg-white' : 'bg-white/20'
                            }`}
                    >
                        <Text className={`text-sm font-bold ${isActive ? 'text-[#e91e8c]' : 'text-white'
                            }`}>
                            {cat.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </ScrollView>
    );
}
