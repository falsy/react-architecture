/* eslint-disable react-hooks/rules-of-hooks */
import { API_URL } from "constants/index"
import ClientHTTP from "adapters/infrastructures/ClientHTTP"
import repositoriesFn from "./repositories"
import useCasesFn from "./useCases"
import presentersFn from "./presenters"

export default function di() {
  const clientHTTP = new ClientHTTP(API_URL)
  const repositories = repositoriesFn({ clientHTTP })
  const useCases = useCasesFn(repositories)
  const presenters = presentersFn(useCases)

  return presenters
}
