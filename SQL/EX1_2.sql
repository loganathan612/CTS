DECLARE
   CURSOR vip_cur IS
      SELECT CustomerID, CustomerName
      FROM Customers
      WHERE Balance > 10000;

BEGIN
   FOR rec IN vip_cur LOOP
      UPDATE Customers
      SET IsVIP = 'TRUE'
      WHERE CustomerID = rec.CustomerID;

      DBMS_OUTPUT.PUT_LINE(
         rec.CustomerName || ' promoted to VIP status.'
      );
   END LOOP;

   COMMIT;
END;
/