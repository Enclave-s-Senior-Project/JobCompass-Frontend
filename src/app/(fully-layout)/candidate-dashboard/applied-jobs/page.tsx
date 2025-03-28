
export default function AppliedJobPage() {
  

  return (
    <div className="min-h-[500px] flex flex-col justify-between space-y-2">
        <div>
            <div className="flex items-center">
                <h5 className="text-lg text-gray-900 font-medium">Applied Jobs</h5>&nbsp;
                <span className="text-base text-gray-400 font-normal">(20)</span>
            </div>
            <div className="space-y-2">
            </div>
        </div>
        {/* {Number(totalPages) > 1 && (
            <div>
                <PrimaryPagination
                    meta={resultQuery?.meta as Meta}
                    pagination={{
                        page,
                        order,
                    }}
                    totalPages={totalPages}
                />
            </div>
        )} */}
    </div>
);
}
