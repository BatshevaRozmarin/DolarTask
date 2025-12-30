import { app } from './app';
import { calculateMonthlyAvgHistory } from './utils/calculateMonthlyAvgHistory';
import { scheduleMonthlyAveragesJob } from './schedule/monthlyJob';


const PORT = process.env.SERVER_PORT;

async function startServer() {
    try {
        await calculateMonthlyAvgHistory();
        scheduleMonthlyAveragesJob();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error: unknown) {
        if (error instanceof Error)
            throw new Error(`Failed to start server: ${error.message}`);
        throw new Error('Failed to start server: unknown error');
    }
}

startServer();
