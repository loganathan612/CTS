DECLARE
   CURSOR loan_cur IS
      SELECT c.CustomerName,
             l.LoanID,
             l.DueDate
      FROM Customers c
      JOIN Loans l
      ON c.CustomerID = l.CustomerID
      WHERE l.DueDate BETWEEN SYSDATE AND SYSDATE + 30;

BEGIN
   FOR rec IN loan_cur LOOP
      DBMS_OUTPUT.PUT_LINE(
         'Reminder: Dear ' || rec.CustomerName ||
         ', your Loan ID ' || rec.LoanID ||
         ' is due on ' ||
         TO_CHAR(rec.DueDate,'DD-MON-YYYY')
      );
   END LOOP;
END;
/