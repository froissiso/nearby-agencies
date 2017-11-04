import agencyList from './data/agencyList.json';

export default function filterAgency(searchText, maxResults) {
  return agencyList.filter((agency) => {
    if (agency.name.includes(searchText)) {
      return true;
    }
    if (agency.description.includes(searchText)) {
      return true;
    }
    return false;
  }).slice(0, maxResults);
}
