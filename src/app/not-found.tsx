import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary-800 dark:text-white mb-4">
          404 - Página não encontrada
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          A página que você está procurando não existe.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-accent-500 text-primary-900 font-medium rounded-lg hover:bg-accent-400 transition-colors"
        >
          Voltar ao início
        </Link>
      </div>
    </div>
  )
}