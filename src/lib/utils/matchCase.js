export function deriveTierFromDimensions({ w_cm = 0, h_cm = 0, d_cm = 0 } = {}) {
	const longest = Math.max(Number(w_cm) || 0, Number(h_cm) || 0, Number(d_cm) || 0);
	const footprint = (Number(w_cm) || 0) * (Number(d_cm) || 0);

	if (longest >= 65 || footprint >= 1800) return 'xl';
	if (longest >= 40 || footprint >= 700) return 'large';
	if (longest >= 22 || footprint >= 180) return 'medium';
	return 'small';
}

export function getTier(setData, localDimensions) {
	const local = localDimensions[setData.set_num];
	if (local) {
		return { tier: local.tier, verified: true, dimensions: local };
	}

	const pieces = Number(setData.num_parts) || 0;
	let tier = 'small';
	if (pieces >= 3000) tier = 'xl';
	else if (pieces >= 1500) tier = 'large';
	else if (pieces >= 500) tier = 'medium';

	return { tier, verified: false, dimensions: null };
}

export function caseFitsDimensions(caseData, dimensions) {
	if (!dimensions) return false;
	return (
		Number(caseData.w_cm) >= Number(dimensions.w_cm) &&
		Number(caseData.h_cm) >= Number(dimensions.h_cm) &&
		Number(caseData.d_cm) >= Number(dimensions.d_cm)
	);
}

export function recommendCase(tier, cases, dimensions = null) {
	const tiers = ['small', 'medium', 'large', 'xl'];
	const tierIndex = tiers.indexOf(tier);
	const orderedTiers = tierIndex === -1 ? tiers : tiers.slice(tierIndex);

	if (dimensions) {
		for (const candidateTier of orderedTiers) {
			const fitting = cases.filter(
				(caseData) => caseData.tier === candidateTier && caseFitsDimensions(caseData, dimensions)
			);
			if (fitting.length) {
				return fitting
					.sort((a, b) => a.w_cm * a.h_cm * a.d_cm - b.w_cm * b.h_cm * b.d_cm)
					.slice(0, candidateTier === 'xl' ? 1 : 2);
			}
		}
	}

	const exact = cases.filter((caseData) => caseData.tier === tier);
	if (exact.length) return exact.slice(0, tier === 'xl' ? 1 : 2);
	const nextTier = tiers[tierIndex + 1];
	if (!nextTier) return cases.filter((caseData) => caseData.tier === 'xl').slice(0, 1);
	return cases.filter((caseData) => caseData.tier === nextTier).slice(0, 2);
}

export function labelCaseFit(index) {
	return index === 0 ? 'Snug fit' : 'Display with room';
}
