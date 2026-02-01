export const formatToHHMMSS = (mmss) => {
    if (!mmss) return '00:00:00';

    const [minutes, seconds] = mmss.toString().split('.');

    const totalSeconds =
        (Number(minutes) * 60) + Number(seconds || 0);

    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = Math.floor(totalSeconds % 60);

    return `${hours.toString().padStart(2, '0')}:${mins
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
