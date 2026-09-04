"use client";

import { FormEvent, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

type PurchaseLeadFormProps = {
  productName: string;
  stripeUrl: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

const fieldClass =
  "mt-2 w-full rounded-md border border-zinc-950/12 bg-white px-4 py-3 text-base text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-ember-500 focus:ring-4 focus:ring-ember-500/12";

export function PurchaseLeadForm({
  productName,
  stripeUrl,
}: PurchaseLeadFormProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const hasStartedRef = useRef(false);

  const handleFormFocus = () => {
    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    trackEvent("order_form_started", { product: productName });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    if (formData.get("bot-field")) {
      return;
    }

    setState("submitting");
    trackEvent("order_form_submitted", { product: productName });

    const body = new URLSearchParams();
    formData.forEach((value, key) => {
      body.append(key, value.toString());
    });

    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    try {
      if (!isLocal) {
        const response = await fetch("/__forms.html", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        });

        if (!response.ok) {
          throw new Error("No se pudo enviar el formulario.");
        }
      }

      setState("success");
      trackEvent("order_form_saved", { product: productName });
    } catch {
      setState("error");
      trackEvent("order_form_error", { product: productName });
    }
  };

  return (
    <section id="pedido" className="scroll-mt-24 rounded-lg border border-zinc-950/10 bg-white p-5 shadow-[0_20px_70px_rgba(24,20,12,0.08)] sm:p-6">
      <div className="max-w-xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-ember-500">
          Antes del pago
        </p>
        <h2 className="mt-3 text-3xl font-semibold leading-tight text-zinc-950">
          Datos para preparar tu pedido.
        </h2>
        <p className="mt-3 text-sm leading-6 text-zinc-600">
          Primero recogemos tus datos de envío. Después se activa el pago seguro
          de Stripe.
        </p>
      </div>

      {state === "success" ? (
        <div className="mt-6 rounded-lg border border-emerald-600/20 bg-emerald-50 p-5 text-zinc-900">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-700" />
            <div>
              <h3 className="font-semibold">Datos recibidos.</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Ya puedes pasar al checkout seguro de Stripe para completar la
                compra.
              </p>
            </div>
          </div>

          <a
            href={stripeUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() =>
              trackEvent("stripe_checkout_started", { product: productName })
            }
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ember-500 px-5 py-4 text-sm font-semibold text-white transition hover:bg-ember-300 sm:w-auto"
          >
            Continuar al pago
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      ) : (
        <form
          name="ascuas-preorder"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          onFocusCapture={handleFormFocus}
          className="mt-6 grid gap-4"
        >
          <input type="hidden" name="form-name" value="ascuas-preorder" />
          <input type="hidden" name="subject" value={`Pedido ${productName}`} />
          <input type="hidden" name="product" value={productName} />

          <p className="hidden">
            <label>
              No rellenar <input name="bot-field" />
            </label>
          </p>

          <label className="text-sm font-semibold text-zinc-800">
            Nombre
            <input
              className={fieldClass}
              name="name"
              type="text"
              autoComplete="name"
              required
              placeholder="Tu nombre"
            />
          </label>

          <label className="text-sm font-semibold text-zinc-800">
            Código postal
            <input
              className={fieldClass}
              name="postalCode"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              required
              placeholder="28001"
            />
          </label>

          <label className="text-sm font-semibold text-zinc-800">
            Dirección
            <textarea
              className={`${fieldClass} min-h-28 resize-y`}
              name="address"
              autoComplete="street-address"
              required
              placeholder="Calle, número, piso, ciudad y provincia"
            />
          </label>

          <label className="text-sm font-semibold text-zinc-800">
            Teléfono
            <input
              className={fieldClass}
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              placeholder="+34 600 000 000"
            />
          </label>

          <label className="text-sm font-semibold text-zinc-800">
            Correo electrónico
            <input
              className={fieldClass}
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="tu@email.com"
            />
          </label>

          {state === "error" ? (
            <p className="rounded-md border border-red-600/20 bg-red-50 px-4 py-3 text-sm leading-6 text-red-800">
              No he podido guardar los datos. Revisa la conexión o inténtalo de
              nuevo antes de pasar al pago.
            </p>
          ) : null}

          <button
            type="submit"
            disabled={state === "submitting"}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 py-4 text-sm font-semibold text-white transition hover:bg-ember-500 disabled:cursor-wait disabled:opacity-70 sm:w-auto"
          >
            {state === "submitting" ? (
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            ) : null}
            Guardar datos y continuar
          </button>
        </form>
      )}
    </section>
  );
}
