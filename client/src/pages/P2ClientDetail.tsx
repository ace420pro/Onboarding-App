import { useParams } from 'react-router-dom'

export default function P2ClientDetail() {
  const { id } = useParams()
  
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">P2 Client Detail</h1>
        <p className="mt-2 text-sm text-gray-700">
          Viewing details for P2 client ID: {id}
        </p>
        <div className="mt-8 card p-6">
          <p className="text-gray-500">P2 client detail page - coming soon</p>
        </div>
      </div>
    </div>
  )
}