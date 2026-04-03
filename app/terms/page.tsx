export default function TermsPage() {
  return (
    <div className="min-h-screen pt-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold text-white mb-6">Terms of Service</h1>
      <div className="space-y-6 text-gray-400 text-sm leading-relaxed">
        <p>Last updated: January 2025</p>
        <p>By using DigiAgentix services, you agree to these terms.</p>
        <h2 className="text-white text-xl font-bold mt-8">Services</h2>
        <p>DigiAgentix provides AI agent development and web design services. Project timelines and deliverables are agreed upon in writing before work begins.</p>
        <h2 className="text-white text-xl font-bold mt-8">Payment</h2>
        <p>50% advance payment is required before project commencement. The remaining 50% is due upon project delivery. All prices are in Indian Rupees (INR).</p>
        <h2 className="text-white text-xl font-bold mt-8">Intellectual Property</h2>
        <p>Upon full payment, clients receive full ownership of their custom-built projects. We retain the right to display completed work in our portfolio unless otherwise agreed.</p>
        <h2 className="text-white text-xl font-bold mt-8">Revisions</h2>
        <p>Each plan includes a specified number of revision rounds. Additional revisions are billed at ₹2,000 per round.</p>
        <h2 className="text-white text-xl font-bold mt-8">Contact</h2>
        <p>Questions: <a href="mailto:hello@DigiAgentixsolutions.in" className="text-accent-blue">hello@DigiAgentixsolutions.in</a></p>
      </div>
    </div>
  );
}
