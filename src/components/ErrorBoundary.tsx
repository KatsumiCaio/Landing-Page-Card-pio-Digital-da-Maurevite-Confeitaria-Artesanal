import React, { ErrorInfo, ReactNode } from 'react';
import { observability } from '../lib/observability';
import { BUSINESS_INFO } from '../data/products';
import { AlertCircle, RefreshCw, MessageCircle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    observability.trackError(error, {
      componentStack: errorInfo.componentStack,
    });
  }

  private handleReload = () => {
    window.location.reload();
  };

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAFAF8] text-[#1E2024] flex items-center justify-center p-4 sm:p-6">
          <div className="max-w-md w-full rounded-3xl border border-zinc-200/90 bg-white p-8 text-center shadow-lg space-y-5">
            <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-[#B48250] flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-serif text-zinc-900 font-normal">
                Ops! Algo inesperado aconteceu
              </h2>
              <p className="text-xs text-zinc-600 font-light leading-relaxed">
                Nossa bancada digital encontrou uma instabilidade temporária. Não se preocupe, seus pedidos podem ser feitos diretamente com a confeiteira.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-zinc-300 text-xs font-medium text-zinc-800 hover:bg-zinc-50 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Recarregar página</span>
              </button>

              <a
                href={
                  BUSINESS_INFO.whatsappBaseUrl +
                  '?text=' +
                  encodeURIComponent(
                    'Olá! Estava navegando no cardápio da Maurevite e gostaria de fazer meu pedido diretamente com você.'
                  )
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#1E2024] hover:bg-zinc-800 text-white text-xs font-medium transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#C49A6C]" />
                <span>Pedir no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

