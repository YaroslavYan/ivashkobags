import QRCode from "react-qr-code";

export default function ManualBlikPayment({ amount = 145 }) {
  const blikNumber = "+534507700"; // твій BLIK / номер телефону
  const qrValue = `blik:${blikNumber}`; // необов'язково, залежить від банку

  return (
    <div className="p-4 border rounded-md bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">Оплата BLIK (тестова)</h3>
      <p>Сума: {amount} PLN</p>
      <p>
        Оплата через BLIK: введіть цей номер у своєму банківському застосунку:
      </p>
      <strong className="text-xl">{blikNumber}</strong>

      <div className="my-4">
        <QRCode value={qrValue} size={128} />
      </div>

      <p>
        Після переказу надішліть нам підтвердження (скріншот або повідомлення),
        щоб ми підтвердили замовлення.
      </p>
    </div>
  );
}
