import Timeline from "@/data/models/Timeline";

export const generateHourlyTimeLabels = (timeline: Timeline): number[] => {
    const { start, end } = timelineToBounds(timeline);
    const labels: number[] = [];
    const oneHour = 60 * 60 * 1000;

    for (let t = start.getTime(); t <= end.getTime(); t += oneHour) {
        labels.push(t);
    }

    return labels;
}

export const generateDailyTimeLabels = (timeline: Timeline): number[] => {
    const { start, end } = timelineToBounds(timeline);
    const labels: number[] = [];
    const oneDay = 24 * 60 * 60 * 1000;

    for (let t = start.getTime(); t <= end.getTime(); t += oneDay) {
        labels.push(t);
    }

    return labels;
}

export const generateMonthlyTimeLabels = (timeline: Timeline): number[] => {
    const { start, end } = timelineToBounds(timeline);
    const labels: number[] = [];
    const oneMonth = 30 * 24 * 60 * 60 * 1000;

    for (let t = start.getTime(); t <= end.getTime(); t += oneMonth) {
        labels.push(t);
    }

    return labels;
}

export const generateTimeLabels = (timeline: Timeline): number[] => {
    if (timeline.type === 'Last 24h') {
        return generateHourlyTimeLabels(timeline);
    }
    else if (timeline.type === 'Last 7 days') {
        return generateDailyTimeLabels(timeline);
    }
    else if (timeline.type === 'Last 30 days') {
        return generateDailyTimeLabels(timeline);
    }
    else if (timeline.type === 'Last year') {
        return generateMonthlyTimeLabels(timeline);
    }
    else if (timeline.type === 'All time') {
        return generateMonthlyTimeLabels(timeline);
    }
    else {
        return generateDailyTimeLabels(timeline);
    }
}

export const generateFormattedTimeLabels = (timeline: Timeline): (label: number) => string => {
    if (timeline.type === 'Last 24h') {
        return (label: number) => new Date(label).getHours().toString();
    }
    else if (timeline.type === 'Last 7 days') {
        return (label: number) => new Date(label).getDate().toString();
    }
    else if (timeline.type === 'Last 30 days') {
        return (label: number) => new Date(label).getDate().toString();
    }
    else if (timeline.type === 'Last year') {
        return (label: number) => new Date(label).getMonth().toString();
    }
    else if (timeline.type === 'All time') {
        return (label: number) => new Date(label).getMonth().toString();
    }
    else {
        return (label: number) => new Date(label).getDate().toString();
    }
}

const timelineToBounds = (timeline: Timeline) => {
    const start = new Date();
    const end = new Date();

    switch (timeline.type) {
        case 'Last 24h':
            start.setHours(start.getHours() - 24);
            break;
        case 'Last 7 days':
            start.setDate(start.getDate() - 7);
            break;
        case 'Last 30 days':
            start.setMonth(start.getMonth() - 1);
            break;
        case 'Last year':
            start.setFullYear(start.getFullYear() - 1);
            break;
        case 'All time':
            start.setFullYear(start.getFullYear() - 1);
            break;
        case 'Custom':
            start.setTime(timeline.customTimeline!.begin.getTime())
            end.setTime(timeline.customTimeline!.end.getTime())
        default:
            break;
    }

    return { start, end };
}