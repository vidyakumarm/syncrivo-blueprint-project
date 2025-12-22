import ComparisonPage from "@/templates/comparisons/ComparisonPage";
import { mioComparison } from "@/data/comparisons";

export default function MioAlternative() {
    return <ComparisonPage {...mioComparison} slug="mio" />;
}
