declare type MYSVGElement = SVGSVGElement & {
	animationsPaused: () => boolean,
};
declare type MYAniTransEL = SVGElement & {
	beginElement: () => void,
	beginElementAt: (sec: number) => void,
	endElement: () => void,
	endElementAt: (sec: number) => void,
};

declare const cfg_debug: boolean;
declare const cfg_dist: boolean;

/* TEMPLATE */
declare const p_base_template_t: boolean;
declare const p_base_template_s: boolean;

declare const _y2_lib_:string;
declare const _project_:string;

declare const y2_word_t: boolean;
declare const y2_word_s: boolean;
declare const y2_workbook_t: boolean;
declare const y2_workbook_s: boolean;
declare const y2_sentence_t: boolean;
declare const y2_sentence_s: boolean;
declare const _build_timestamp_:string;

declare const y2_ls_retelling_t: boolean;
declare const y2_ls_retelling_s: boolean;
declare const y2_rw_retelling_t: boolean;
declare const y2_rw_retelling_s: boolean;
declare const y2_ls_comprehension_t: boolean;
declare const y2_ls_comprehension_s: boolean;
declare const y2_rw_comprehension_t: boolean;
declare const y2_rw_comprehension_s: boolean;
declare const y1_word_t: boolean;
declare const y1_word_s: boolean;
declare const y1_chant_t: boolean;
declare const y1_chant_s: boolean;
declare const y1_story_t: boolean;
declare const y1_story_s: boolean;
declare const y1_sentence_t: boolean;
declare const y1_sentence_s: boolean;
declare const y1_sentence_making_t: boolean;
declare const y1_sentence_making_s: boolean;
declare const y1_storytelling_t: boolean;
declare const y1_storytelling_s: boolean;
declare const y2_storytelling_t: boolean;
declare const y2_storytelling_s: boolean;
