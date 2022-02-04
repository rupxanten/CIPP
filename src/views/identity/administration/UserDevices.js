import React from 'react'
import PropTypes from 'prop-types'
import { CLink } from '@coreui/react'
import { faLaptop } from '@fortawesome/free-solid-svg-icons'
import { DatatableContentCard } from 'src/components/contentcards'
import { cellBooleanFormatter, cellNullTextFormatter } from 'src/components/tables'
import { useListUserDevicesQuery } from 'src/store/api/devices'

const columns = [
  {
    name: 'Display Name',
    selector: (row) => row['displayName'],
    sortable: true,
    exportSelector: 'displayName',
    cell: (row, index, column) => {
      if (row.EPMID === null) {
        return row.displayName ?? 'n/a'
      } else {
        return (
          <CLink
            target="_blank"
            href={`https://endpoint.microsoft.com/${row.tenantDomain}#blade/Microsoft_Intune_Devices/DeviceSettingsMenuBlade/overview/mdmDeviceId/${row.EPMID}`}
          >
            {row.displayName}
          </CLink>
        )
      }
    },
  },
  {
    name: (row) => row['Enabled'],
    selector: (row) => row['accountEnabled'],
    sortable: true,
    cell: cellNullTextFormatter(),
    exportSelector: 'accountEnabled',
  },
  {
    name: 'Compliant',
    selector: (row) => row['isCompliant'],
    sortable: true,
    cell: cellNullTextFormatter(),
    exportSelector: 'isCompliant',
  },
  {
    name: 'Manufacturer',
    selector: (row) => row['manufacturer'],
    sortable: true,
    cell: cellNullTextFormatter(),
    exportSelector: 'manufacturer',
  },
  {
    name: 'Model',
    selector: (row) => row['model'],
    sortable: true,
    cell: cellNullTextFormatter(),
    exportSelector: 'model',
  },
  {
    name: 'Operating System',
    selector: (row) => row['operatingSystem'],
    sortable: true,
    cell: cellNullTextFormatter(),
    exportSelector: 'operatingSystem',
  },
  {
    name: 'OS Version',
    selector: (row) => row['operatingSystemVersion'],
    sortable: true,
    cell: cellNullTextFormatter(),
    exportSelector: 'operatingSystemVersion',
  },
  {
    name: 'Created',
    selector: (row) => row['createdDateTime'],
    sortable: true,
    cell: cellNullTextFormatter(),
    exportSelector: 'createdDateTime',
  },
  {
    name: 'Approx Last SignIn',
    selector: (row) => row['approximateLastSignInDateTime'],
    sortable: true,
    cell: cellNullTextFormatter(),
    exportSelector: 'approximateLastSignInDateTime',
  },
  {
    name: 'Ownership',
    selector: (row) => row['deviceOwnership'],
    sortable: true,
    cell: cellNullTextFormatter(),
    exportSelector: 'deviceOwnership',
  },
  {
    name: 'Enrollment Type',
    selector: (row) => row['enrollmentType'],
    sortable: true,
    cell: cellNullTextFormatter(),
    exportSelector: 'enrollmentType',
  },
  {
    name: 'Management Type',
    selector: (row) => row['managementType'],
    sortable: true,
    cell: cellNullTextFormatter(),
    exportSelector: 'managementType',
  },
  {
    name: 'On-Premises Sync Enabled',
    selector: (row) => row['onPremisesSyncEnabled'],
    sortable: true,
    cell: cellBooleanFormatter(),
    exportSelector: 'onPremisessSyncEnabled',
  },
  {
    name: 'Trust Type',
    selector: (row) => row['trustType'],
    sortable: true,
    cell: cellNullTextFormatter(),
    exportSelector: 'trustType',
  },
]

export default function UserDevices({ userId, tenantDomain, className = null }) {
  const {
    data: devices = [],
    isFetching,
    error,
  } = useListUserDevicesQuery({ userId, tenantDomain })

  // inject tenant domain into devices for column render
  const mapped = devices.map((device) => ({ ...device, tenantDomain }))

  return (
    <DatatableContentCard
      title="User Devices"
      icon={faLaptop}
      datatable={{
        reportName: 'ListUserDevices',
        path: '/api/ListUserDevices',
        params: { tenantFilter: tenantDomain, userId },
        columns,
        keyField: 'id',
        responsive: true,
        dense: true,
        striped: true,
        data: mapped,
      }}
      className={className}
      isFetching={isFetching}
      error={error}
      errorMessage="Error fetching user devices"
    />
  )
}

UserDevices.propTypes = {
  userId: PropTypes.string.isRequired,
  tenantDomain: PropTypes.string.isRequired,
  className: PropTypes.string,
}
