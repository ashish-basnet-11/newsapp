import Link from 'next/link'

const page = () => {
  return (
    <div>
      <div>
        Admin Page
      </div>
      <Link href="/admin/dashboard" className="hover:text-blue-400">Admin Dashboard</Link>

    </div>
  )
}

export default page