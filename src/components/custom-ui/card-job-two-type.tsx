import { DetailedResponse } from 'api-types';
import CardJobHorizontal from './card-job-horizontal';
import CardJob from './card-job';

export default function JobCardTwoType(props: { job: DetailedResponse.JobCardProps; viewType: string }) {
    const { job, viewType } = props;

    if (viewType === 'list') {
        return <CardJobHorizontal job={job} />;
    }

    return <CardJob job={job} />;
}
