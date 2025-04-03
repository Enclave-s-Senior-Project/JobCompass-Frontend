const getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const getBackgroundColor = (color: string): string => {
    // Loại bỏ ký tự '#' từ mã màu
    const hex = color.replace('#', '');

    // Chia giá trị hex cho 10 và làm tròn
    const backgroundColorValue = Math.floor(parseInt(hex, 16) / 10);

    // Chuyển đổi giá trị trở lại thành mã hex
    return `#${Math.floor(backgroundColorValue).toString(16).padStart(6, '0')}`;
};

const featureColors = [
    { bg: 'bg-danger-100', text: 'danger-600' },
    { bg: 'bg-blue-100', text: 'blue-600' },
    { bg: 'bg-green-100', text: 'green-600' },
    { bg: 'bg-yellow-100', text: 'yellow-600' },
    { bg: 'bg-purple-100', text: 'purple-600' },
];

// Đảm bảo index luôn nằm trong phạm vi của featureColors
const getRandomFeatureColor = () => {
    const randomIndex = Math.floor(Math.random() * featureColors.length);
    return featureColors[randomIndex];
};

export { getRandomColor, getBackgroundColor, featureColors, getRandomFeatureColor };
