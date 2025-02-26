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

export { getRandomColor, getBackgroundColor };
