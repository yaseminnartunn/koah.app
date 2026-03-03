import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

export default function StatsCard({ label, value, color, onClick = () => { } }) {
    // NativeWind class names for dynamic colors
    const bgColor = color.startsWith('bg-') ? color : 'bg-[#e91e8c]';

    return (
        <TouchableOpacity
            onPress={onClick}
            className={`flex-1 rounded-2xl p-3 items-center justify-center ${bgColor} shadow-sm`}
        >
            <Text className="text-2xl font-bold text-white tracking-wider">{value}</Text>
            <Text className="text-[10px] text-white opacity-90 text-center font-medium leading-[14px]">
                {label}
            </Text>
        </TouchableOpacity>
    );
}
