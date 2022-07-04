package util.annotations;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;

public class AnnotationExclusionUserStrategy implements ExclusionStrategy {

	@Override
    public boolean shouldSkipField(FieldAttributes f) {
        return f.getAnnotation(ExcludeUser.class) != null;
    }

    @Override
    public boolean shouldSkipClass(Class<?> clazz) {
        return false;
    }

}
