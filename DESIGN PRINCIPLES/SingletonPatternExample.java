public class SingletonPatternExample {

    // Singleton Logger Class
    static class Logger {

        // Private static instance
        private static Logger instance;

        // Private constructor
        private Logger() {
            System.out.println("Logger Instance Created");
        }

        // Public method to get instance
        public static Logger getInstance() {

            if (instance == null) {
                instance = new Logger();
            }

            return instance;
        }

        // Logging method
        public void log(String message) {
            System.out.println("LOG: " + message);
        }
    }

    // Main Method
    public static void main(String[] args) {

        Logger logger1 = Logger.getInstance();
        logger1.log("Application Started");

        Logger logger2 = Logger.getInstance();
        logger2.log("User Logged In");

        // Verify Singleton
        if (logger1 == logger2) {
            System.out.println("Only one Logger instance exists.");
        } else {
            System.out.println("Multiple Logger instances created.");
        }

        System.out.println("HashCode of logger1: " + logger1.hashCode());
        System.out.println("HashCode of logger2: " + logger2.hashCode());
    }
}