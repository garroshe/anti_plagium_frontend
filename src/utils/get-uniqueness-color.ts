export const getUniquenessColor = (percent: number) => {
    if (percent >= 80) return "#10b981";
    if (percent >= 60) return "#f59e0b";
    return "#ef4444";
};