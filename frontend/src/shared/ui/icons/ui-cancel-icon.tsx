export function CancelIcon({ className }: { className?: string }) {
	return <CancelShield className={className} />
}

export const CancelShield = ({ className }: { className?: string }) => {
	return (
		<svg width='32' height='32' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' className={className}>
			<path
				fill='currentColor'
				d='M9.525 13.765a.5.5 0 0 0 .71.71c.59-.59 1.175-1.18 1.765-1.76l1.765 1.76a.5.5 0 0 0 .71-.71c-.59-.58-1.18-1.175-1.76-1.765c.41-.42.82-.825 1.23-1.235c.18-.18.35-.36.53-.53a.5.5 0 0 0-.71-.71L12 11.293l-1.765-1.768a.5.5 0 0 0-.71.71L11.293 12Z'
			/>
		</svg>
	)
}
