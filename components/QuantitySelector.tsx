'use client'

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
}

export default function QuantitySelector({
  value,
  onChange,
}: QuantitySelectorProps) {
  return (
    <div className="flex gap-4 flex-wrap">
      {[1, 2, 3].map((num) => (
        <button
          key={num}
          onClick={() => onChange(num)}
          className={`px-6 py-3 font-bold border-2 transition-all ${
            value === num
              ? 'border-black bg-black text-white'
              : 'border-black bg-white text-black hover:bg-gray'
          }`}
        >
          {num} {num === 1 ? 'Person' : 'People'}
        </button>
      ))}
    </div>
  )
}
