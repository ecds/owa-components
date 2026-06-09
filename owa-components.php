<?php
/**
 * Plugin Name: OWA Components
 * Description: Embeds Open World Atlanta interactive map components via shortcode.
 * Version: 1.0.0
 */

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Usage: [owa_component name="neighborhood-map" height="600px"]
 *
 * The name must match the directory under wp-content/plugins/owa-components/.
 * Height is optional and defaults to 500px.
 */
function owa_component_shortcode( $atts ) {
    $atts = shortcode_atts(
        [
            'name'   => '',
            'height' => '500px',
        ],
        $atts,
        'owa_component'
    );

    $name = sanitize_key( $atts['name'] );
    if ( ! $name ) return '';

    $plugin_url = plugin_dir_url( __FILE__ );
    $plugin_path = plugin_dir_path( __FILE__ );

    $js_file  = $plugin_path . $name . '/index.js';
    $css_file = $plugin_path . $name . '/index.css';

    if ( ! file_exists( $js_file ) ) {
        return "<!-- owa_component: '$name' not found -->";
    }

    $handle = 'owa-' . $name;

    wp_enqueue_script(
        $handle,
        $plugin_url . $name . '/index.js',
        [],
        filemtime( $js_file ),
        true
    );

    if ( file_exists( $css_file ) ) {
        wp_enqueue_style(
            $handle,
            $plugin_url . $name . '/index.css',
            [],
            filemtime( $css_file )
        );
    }

    $height = esc_attr( $atts['height'] );

    return sprintf(
        '<div id="%s" style="width:100%%;height:%s"></div>',
        esc_attr( $name ),
        $height
    );
}
add_shortcode( 'owa_component', 'owa_component_shortcode' );
