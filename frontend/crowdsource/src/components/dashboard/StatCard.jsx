function StatCard({ title, value, bgClass }) {
    return (
        <div className={`${bgClass} rounded-xl p-6 shadow text-white`}>
            <h2 className="text-lg">{title}</h2>

            <p className="text-3xl font-bold mt-2">
                {value}
            </p>
        </div>
    );
}

export default StatCard;