import ComparisonPage from "@/templates/comparisons/ComparisonPage";
import { zapierComparison } from "@/data/comparisons";

export default function ZapierAlternative() {
    return <ComparisonPage {...zapierComparison} slug="zapier" />;
}
