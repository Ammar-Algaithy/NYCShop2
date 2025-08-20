export default function About(){
  // PAGE DATA
  const store = {
    hours: "Mon–Sun • 10:00–22:00",
    phone: "(1234) 456-7890",
    address: "xxx Lenox Ave, New York, NY",
  };

  return (
    <section className="section">
      <div className="container grid md:grid-cols-2 gap-8 items-start">
        <div>
          <h1 className="h1">About Us</h1>
          <p className="lead mt-2">
            NY Smoke 2 is a modern NYC smoke shop focused on quality, clear info,
            and fast, friendly service. We keep a tight rotation of essentials and
            seasonal releases—so you’ll always find something new.
          </p>
          <ul className="mt-6 space-y-2 text-white/80 text-sm">
            <li>• Curated brands with verified quality</li>
            <li>• Fast stock rotation & weekly drops</li>
            <li>• Clean, simple in-store browsing</li>
          </ul>
        </div>
        <div className="card">
          <div className="text-lg font-semibold">Store Info</div>
          <div className="mt-3 text-sm text-white/80">
            <div><strong>Hours:</strong> {store.hours}</div>
            <div><strong>Phone:</strong> {store.phone}</div>
            <div><strong>Address:</strong> {store.address}</div>
          </div>
          <a href="https://maps.google.com" target="_blank" className="btn btn-primary mt-4">Open in Maps</a>
        </div>
      </div>
    </section>
  );
}
