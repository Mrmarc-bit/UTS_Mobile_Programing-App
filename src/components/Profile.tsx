import { User, Globe, LogOut, ChevronRight, Settings } from 'lucide-react';

export default function Profile() {
  const menuItems = [
    { id: 'edit', name: 'Edit Profile', icon: User, color: 'from-blue-50 to-cyan-50' },
    { id: 'language', name: 'Language', icon: Globe, color: 'from-purple-50 to-pink-50' },
    { id: 'settings', name: 'Settings', icon: Settings, color: 'from-green-50 to-emerald-50' },
    { id: 'logout', name: 'Logout', icon: LogOut, color: 'from-red-50 to-pink-50' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900 mb-2">Profile</h2>
        <p className="text-sm text-gray-500">Kelola akun dan preferensi Anda</p>
      </div>

      {/* User Card */}
      <div className="bg-gradient-to-br from-white to-orange-50/50 rounded-3xl p-6 shadow-lg shadow-orange-100/50 border border-orange-100/50">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          <div>
            <h3 className="text-gray-900">Ma'ruf Muchlisin</h3>
            <p className="text-sm text-gray-500">muchlisinmaruf@gmail.com</p>
            <div className="mt-2 inline-flex items-center gap-1 bg-yellow-400/20 px-3 py-1 rounded-full">
              <span className="text-xs text-yellow-800">Premium Member</span>
              <span className="text-xs">✨</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
          <p className="text-gray-900 mb-1">127</p>
          <p className="text-xs text-gray-500">Transaksi</p>
        </div>
        <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
          <p className="text-gray-900 mb-1">6</p>
          <p className="text-xs text-gray-500">Bulan Aktif</p>
        </div>
        <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
          <p className="text-gray-900 mb-1">5</p>
          <p className="text-xs text-gray-500">Kategori</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className="w-full bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm border border-gray-100 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 text-gray-700" />
                </div>
                <span className="text-gray-900">{item.name}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
            </button>
          );
        })}
      </div>

      {/* App Info */}
      <div className="text-center pt-4">
        <p className="text-xs text-gray-400">MoneyApp v1.0.0</p>
        <p className="text-xs text-gray-400 mt-1">Made with ❤️ in Suntree Art</p>
      </div>
    </div>
  );
}
