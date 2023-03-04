import clsx from 'clsx';

const types = {
    warning: {
        span: 'bg-yellow-100 text-yellow-800',
        svg: 'text-yellow-400',
    },
    danger: {
        span: 'bg-red-100 text-red-800',
        svg: 'text-red-400',
    },
    success: {
        span: 'bg-green-100 text-green-800',
        svg: 'text-green-400',
    },
};

export default function Badge({ value, children, type = 'warning' }) {
    return (
        <span className={clsx('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium', types[type].span)}>
            <svg className={clsx('-ml-0.5 mr-1.5 h-2 w-2', types[type].svg)} fill="currentColor" viewBox="0 0 8 8">
                <circle cx={4} cy={4} r={3} />
            </svg>
            {value ?? children}
        </span>
    );
}
