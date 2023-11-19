// TODO: i18n

interface Props {
  name: string
  loading: boolean
  error: Error | null
}

type NameProp = Pick<Props, 'name'>;
type ErrorProps = NameProp & { error: Error };

const LoadingMessage = ({ name }: NameProp) => (
  <div>
    Loading {name} data...
  </div>
);

const ErrorMessage = ({ name, error }: ErrorProps) => (
  <div>
    Failed to fetch {name} data: {error.message}
  </div>
);

export const NoData = ({ name, loading, error }: Props) =>
  loading
    ? <LoadingMessage name={name} />
    : error
      ? <ErrorMessage name={name} error={error} />
      : <ErrorMessage name={name} error={new Error('No data')} />;
