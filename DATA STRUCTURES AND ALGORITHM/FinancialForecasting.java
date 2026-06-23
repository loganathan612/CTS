public class FinancialForecasting {

    // Recursive method to calculate future value
    public static double predictFutureValue(double currentValue,
                                            double growthRate,
                                            int years) {

        // Base Case
        if (years == 0) {
            return currentValue;
        }

        // Recursive Case
        return predictFutureValue(
                currentValue * (1 + growthRate),
                growthRate,
                years - 1
        );
    }

    public static void main(String[] args) {

        double currentValue = 10000; // Initial investment
        double growthRate = 0.10;    // 10% growth
        int years = 5;

        double futureValue = predictFutureValue(
                currentValue,
                growthRate,
                years
        );

        System.out.printf("Future Value after %d years: %.2f",
                years, futureValue);
    }
}