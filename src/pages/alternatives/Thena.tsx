import ComparisonPage from "@/templates/comparisons/ComparisonPage";
import { thenaComparison } from "@/data/comparisons";

export default function ThenaAlternative() {
    return <ComparisonPage {...thenaComparison} slug="thena" />;
}
