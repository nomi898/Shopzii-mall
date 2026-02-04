type Order = {
    id: string;
    price: number;
    completedAt: string;
  };
  
  export default function CompletedOrdersList({
    orders,
  }: {
    orders: Order[];
  }) {
    return (
      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="rounded-lg bg-white p-4 shadow"
          >
            <p>Order ID: {order.id}</p>
            <p>Price: ${order.price}</p>
            <p className="text-sm text-gray-500">
              Completed at {order.completedAt}
            </p>
          </div>
        ))}
      </div>
    );
  }
  