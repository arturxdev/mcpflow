const plans = [
  {
    name: 'Free',
    description: 'Para proyectos personales',
    price: '$0',
    billing: 'Gratis para siempre',
    features: [
      '3 boards',
      'Tareas ilimitadas',
      'Markdown en descripciones',
      'Acceso a MCP básico',
    ],
    cta: 'Comenzar gratis',
    href: '/dashboard',
    featured: false,
  },
  {
    name: 'Pro',
    description: 'Para equipos pequeños',
    price: '$12',
    billing: 'Facturado anualmente',
    features: [
      'Boards ilimitados',
      'Colaboradores ilimitados',
      'MCP con todas las tools',
      'Integraciones premium',
      'Soporte prioritario',
    ],
    cta: 'Elegir Pro',
    href: '/dashboard',
    featured: true,
  },
  {
    name: 'Team',
    description: 'Para empresas',
    price: '$29',
    billing: 'Por usuario, facturado anualmente',
    features: [
      'Todo de Pro',
      'SSO / SAML',
      'Auditoría y logs',
      'API dedicada',
      'SLA garantizado',
    ],
    cta: 'Contactar ventas',
    href: '#',
    featured: false,
  },
]

export function Pricing() {
  return (
    <section id="precios" className="px-16 py-32">
      {/* Section Header */}
      <div className="mb-20 text-center">
        <h2
          className="mb-4 text-[clamp(2rem,5vw,3.5rem)] font-normal tracking-[-0.02em]"
          style={{ fontFamily: 'var(--font-instrument-serif)' }}
        >
          Simple y transparente
        </h2>
        <p className="mx-auto max-w-[500px] text-[1.1rem] text-[var(--text-secondary)]">
          Comienza gratis, escala cuando lo necesites
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="mx-auto grid max-w-[1100px] grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative rounded-2xl border p-10 transition-all duration-300 hover:-translate-y-1 ${
              plan.featured
                ? 'border-[var(--accent-indigo)] bg-[var(--bg-secondary)]'
                : 'border-[var(--border-subtle)] bg-[var(--bg-secondary)]'
            }`}
            style={
              plan.featured
                ? { boxShadow: '0 0 60px var(--accent-indigo-glow)' }
                : undefined
            }
          >
            {/* Popular Badge */}
            {plan.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="rounded-[100px] bg-[var(--accent-indigo)] px-4 py-1 text-[0.75rem] font-semibold text-[var(--bg-primary)]">
                  Popular
                </span>
              </div>
            )}

            {/* Plan Name */}
            <div className="mb-2 text-[1.1rem] font-medium">{plan.name}</div>

            {/* Description */}
            <div className="mb-6 text-[0.9rem] text-[var(--text-muted)]">
              {plan.description}
            </div>

            {/* Price */}
            <div className="mb-1">
              <span
                className="text-[3rem] font-normal"
                style={{ fontFamily: 'var(--font-instrument-serif)' }}
              >
                {plan.price}
              </span>
              <span className="text-[1rem] text-[var(--text-muted)]"> / mes</span>
            </div>

            {/* Billing */}
            <div className="mb-8 text-[0.85rem] text-[var(--text-muted)]">
              {plan.billing}
            </div>

            {/* Features List */}
            <ul className="mb-8 space-y-3">
              {plan.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-[0.9rem] text-[var(--text-secondary)]"
                >
                  <span className="font-semibold text-[var(--status-done)]">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <a
              href={plan.href}
              className={`block w-full rounded-lg py-3 text-center text-[0.9rem] font-medium transition-all duration-200 ${
                plan.featured
                  ? 'bg-[var(--accent-indigo)] text-[var(--bg-primary)] hover:-translate-y-0.5 hover:shadow-lg'
                  : 'border border-[var(--border-hover)] bg-transparent text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.05)]'
              }`}
            >
              {plan.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
