import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AppliedJob, Enterprise } from '@/types';

type Props = {
    appliedJobs: AppliedJob[];
    enterprises: Enterprise[];
    setCompany: (name: string) => void;
    company: string | undefined;
};

export function RecentApplications({ appliedJobs, enterprises, setCompany, company }: Props) {
    const [selectedCompany, setSelectedCompanyLocal] = useState<string>('all');
    const companies = ['all', ...new Set(enterprises.map((enterprise) => enterprise.name))];

    // Sync selectedCompany with parent company state
    useEffect(() => {
        setSelectedCompanyLocal(company ? company : 'all');
    }, [company]);

    const handleCompanyChange = (value: string) => {
        setSelectedCompanyLocal(value);
        setCompany(value === 'all' ? '' : value);
    };

    const filteredApplications =
        selectedCompany === 'all'
            ? appliedJobs
            : appliedJobs.filter((app) => app?.job.enterprise.name === selectedCompany);

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Select value={selectedCompany} onValueChange={handleCompanyChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Chọn công ty" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Job</SelectItem>
                        {companies
                            .filter((company) => company !== 'all')
                            .map((company) => (
                                <SelectItem key={company} value={company}>
                                    {company}
                                </SelectItem>
                            ))}
                    </SelectContent>
                </Select>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Candidate</TableHead>
                        <TableHead>Job</TableHead>
                        <TableHead>Create Date</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredApplications.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="py-6 text-center text-muted-foreground">
                                There are no job postings.
                            </TableCell>
                        </TableRow>
                    ) : (
                        filteredApplications.map((application) => (
                            <TableRow key={application.appliedJobId}>
                                <TableCell className="font-medium">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={application.profile?.profileUrl} />
                                            <AvatarFallback>{application.profile?.fullName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{application.profile?.fullName}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {application.profile?.account?.email}
                                            </div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div>{application.job.name}</div>
                                    <div className="text-xs text-muted-foreground">
                                        {application.job.enterprise.name}
                                    </div>
                                </TableCell>
                                <TableCell>{new Date(application.createdAt).toLocaleDateString('vi-VN')}</TableCell>
                                <TableCell>
                                    <Badge
                                    // variant={
                                    //     application.status === 'APPROVED'
                                    //         ? 'success'
                                    //         : application.status === 'PENDING'
                                    //           ? 'outline'
                                    //           : 'destructive'
                                    // }
                                    >
                                        {application.status === 'APPROVED' && 'Approved'}
                                        {application.status === 'PENDING' && 'Pending'}
                                        {application.status === 'REJECTED' && 'Rejected'}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
