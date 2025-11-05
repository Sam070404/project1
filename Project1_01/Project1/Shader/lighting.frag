#version 330 core
struct Material
{
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;
    float shininess;

};

struct Light
{
    vec3 position;
    vec3 ambient;
    vec3 diffuse;
    vec3 specular;

    vec3 position2;
    vec3 ambient2;
    vec3 diffuse2;
    vec3 specular2;
};

in vec3 FragPos;
in vec3 FragPos2;
in vec3 Normal;
in vec2 TexCoords;

out vec4 color;
out vec4 color2;

uniform vec3 viewPos;
uniform vec3 viewPos2;
uniform Material material;
uniform Light light;

uniform sampler2D texture_diffuse;

void main()
{
    // Ambient
    vec3 ambient = light.ambient *material.diffuse;
    
    // Diffuse
    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(light.position - FragPos);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = light.diffuse * diff * material.diffuse;
    
    // Specular
    vec3 viewDir = normalize(viewPos - FragPos);
    vec3 reflectDir = reflect(-lightDir, norm);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
    vec3 specular = light.specular * (spec * material.specular);
    
    vec3 result = ambient + diffuse + specular;
    color = vec4(result, 1.0f)*texture(texture_diffuse,TexCoords);



    //SEGUNDA LUZ
    // Ambient
    vec3 ambient2 = light.ambient *material.diffuse;
    
    // Diffuse
    vec3 norm2 = normalize(Normal);
    vec3 lightDir2 = normalize(light.position - FragPos2);
    float diff2 = max(dot(norm2, lightDir2), 0.0);
    vec3 diffuse2 = light.diffuse * diff2 * material.diffuse;
    
    // Specular
    vec3 viewDir2 = normalize(viewPos2 - FragPos2);
    vec3 reflectDir2 = reflect(-lightDir, norm2);
    float spec2 = pow(max(dot(viewDir2, reflectDir2), 0.0), material.shininess);
    vec3 specular2 = light.specular * (spec * material.specular);
    
    vec3 result2 = ambient2 + diffuse2 + specular2;
    color2 = vec4(result2, 1.0f);
}