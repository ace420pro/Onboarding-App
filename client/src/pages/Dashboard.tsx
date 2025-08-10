import { useQuery } from '@tanstack/react-query'
import {
  UsersIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data - replace with actual API call
const dashboardStats = {
  totalP2s: 45,
  activeVerifications: 23,
  completedToday: 8,
  failedVerifications: 3,
  completionRate: 87.2,
  recentActivity: [
    { name: 'Mon', completed: 12, failed: 2 },
    { name: 'Tue', completed: 15, failed: 1 },
    { name: 'Wed', completed: 8, failed: 3 },
    { name: 'Thu', completed: 14, failed: 2 },
    { name: 'Fri', completed: 11, failed: 1 },
    { name: 'Sat', completed: 7, failed: 0 },
    { name: 'Sun', completed: 5, failed: 1 },
  ]
}

const stats = [
  {
    name: 'Total P2 Clients',
    stat: dashboardStats.totalP2s,
    icon: UsersIcon,
    change: '+12%',
    changeType: 'increase',
  },
  {
    name: 'Active Verifications',
    stat: dashboardStats.activeVerifications,
    icon: ClockIcon,
    change: '+5',
    changeType: 'increase',
  },
  {
    name: 'Completed Today',
    stat: dashboardStats.completedToday,
    icon: CheckCircleIcon,
    change: '+2',
    changeType: 'increase',
  },
  {
    name: 'Failed Verifications',
    stat: dashboardStats.failedVerifications,
    icon: ExclamationTriangleIcon,
    change: '-1',
    changeType: 'decrease',
  },
]

export default function Dashboard() {
  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        
        {/* Stats */}
        <div className="mt-8">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((item) => (
              <div key={item.name} className="card p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <item.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {item.name}
                      </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">
                          {item.stat}
                        </div>
                        <div className="ml-2 flex items-baseline text-sm font-semibold">
                          <span
                            className={
                              item.changeType === 'increase'
                                ? 'text-green-600'
                                : 'text-red-600'
                            }
                          >
                            {item.change}
                          </span>
                          <span className="text-gray-500 ml-1">from yesterday</span>
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Chart */}
        <div className="mt-8">
          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Weekly Activity
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardStats.recentActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
                    <Bar dataKey="failed" fill="#ef4444" name="Failed" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="flow-root">
                <ul className="-mb-8">
                  {[
                    {
                      id: 1,
                      content: 'John Doe completed verification on SweepstakeCasino',
                      time: '2 minutes ago',
                      status: 'success',
                    },
                    {
                      id: 2,
                      content: 'Identity verification sent to Sarah Johnson',
                      time: '5 minutes ago',
                      status: 'info',
                    },
                    {
                      id: 3,
                      content: 'Failed registration attempt for Mike Wilson on PulseCasino',
                      time: '10 minutes ago',
                      status: 'error',
                    },
                    {
                      id: 4,
                      content: 'Email verification completed for Lisa Chen',
                      time: '15 minutes ago',
                      status: 'success',
                    },
                  ].map((item, itemIdx, items) => (
                    <li key={item.id}>
                      <div className="relative pb-8">
                        {itemIdx !== items.length - 1 && (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        )}
                        <div className="relative flex space-x-3">
                          <div>
                            <span
                              className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                                item.status === 'success'
                                  ? 'bg-green-500'
                                  : item.status === 'error'
                                  ? 'bg-red-500'
                                  : 'bg-blue-500'
                              }`}
                            >
                              {item.status === 'success' ? (
                                <CheckCircleIcon className="h-5 w-5 text-white" />
                              ) : item.status === 'error' ? (
                                <ExclamationTriangleIcon className="h-5 w-5 text-white" />
                              ) : (
                                <ClockIcon className="h-5 w-5 text-white" />
                              )}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">{item.content}</p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              {item.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                System Status
              </h3>
              <div className="space-y-3">
                {[
                  { name: 'Web Automation Engine', status: 'operational' },
                  { name: 'Email Service', status: 'operational' },
                  { name: 'SMS Service', status: 'operational' },
                  { name: 'Database', status: 'operational' },
                ].map((service) => (
                  <div key={service.name} className="flex items-center justify-between">
                    <span className="text-sm text-gray-900">{service.name}</span>
                    <span className="status-active">Operational</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Performance Metrics
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-900">Success Rate</span>
                  <span className="text-sm font-medium text-green-600">
                    {dashboardStats.completionRate}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-900">Average Processing Time</span>
                  <span className="text-sm font-medium text-gray-900">12.5 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-900">Active Websites</span>
                  <span className="text-sm font-medium text-gray-900">47/73</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-900">Queue Length</span>
                  <span className="text-sm font-medium text-gray-900">8 jobs</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}