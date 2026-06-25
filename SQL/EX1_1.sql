DECLARE
   CURSOR cust_cur IS
      SELECT c.CustomerID, l.LoanID, l.InterestRate
      FROM Customers c
      JOIN Loans l
      ON c.CustomerID = l.CustomerID
      WHERE c.Age > 60;

BEGIN
   FOR rec IN cust_cur LOOP
      UPDATE Loans
      SET InterestRate = InterestRate - 1
      WHERE LoanID = rec.LoanID;

      DBMS_OUTPUT.PUT_LINE(
         'Discount applied to Customer ID: ' ||
         rec.CustomerID
      );
   END LOOP;

   COMMIT;
END;
/