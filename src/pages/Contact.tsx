export default function Contact(){
  // PAGE DATA
  const contact = {
    phone: "(123) 456-7890",
    email: "contact@nysmoke2.com",
    address: "xxx Lenox Ave, New York, NY",
    hours: "Mon–Sun • 10:00–22:00",
  };

  return (
    <section className="section">
      <div className="container grid md:grid-cols-2 gap-8">
        <div className="card">
          <div className="h2">Contact</div>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li><strong>Phone:</strong> {contact.phone}</li>
            <li><strong>Email:</strong> {contact.email}</li>
            <li><strong>Address:</strong> {contact.address}</li>
            <li><strong>Hours:</strong> {contact.hours}</li>
          </ul>
        </div>

        <form className="card">
          <label className="block text-sm">
            Name
            <input className="mt-1 w-full border border-white/15 bg-white/5 rounded px-3 py-2" />
          </label>
          <label className="block text-sm mt-3">
            Email
            <input className="mt-1 w-full border border-white/15 bg-white/5 rounded px-3 py-2" />
          </label>
          <label className="block text-sm mt-3">
            Message
            <textarea className="mt-1 w-full border border-white/15 bg-white/5 rounded px-3 py-2 h-28" />
          </label>
          <button type="button" className="btn btn-primary mt-4">Send</button>
        </form>
      </div>
    </section>
  );
}
